"use strict";

const { Router } = require("express");
const { Webhook, EmbedBuilder } = require("discord-whook.js");
const config = require("../config");

module.exports = class WebHook extends Router
{
  constructor()
  {
    super();
    this.webhook = new Webhook(config.webhook.id, config.webhook.token);
    this._sendMessage = (req, res, next) =>
    {
        const Builder = new EmbedBuilder()
        .setDescription(`📨 **<@${(typeof req.body.user === "string" ? req.body.user : req.body.user.id)}>** just upvoted **IA#3068** !`)
        .setTimestamp();
        this.webhook.send(null, config.webhook.name, config.webhook.avatar, Builder.embed);
        return res.status(200).json({ error: false, status: 200, message: "OK" });
    }
    this.post("/:id", (req, res, next) =>
    {
      let item = config.lists.find(i => i.path === `/${req.params.id}`);
      if (!item)
        return res.status(404).json({ error: true, status: 404, message: "Invalid Path." });
      if (req.get("Authorization") !== item.token)
        return res.status(401).json({ error: true, status: 401, message: "Authorization Header missing or invalid token." });
      else
        this._sendMessage(req, res, next);
    });
  }
};