"use strict";

const { Router } = require("express");

module.exports = class Home extends Router
{
  constructor()
  {
    super();
    this.get('/', (req, res, next) =>
    {
        return res.status(200).send("Webhook Server Online !");
    });
  }
};