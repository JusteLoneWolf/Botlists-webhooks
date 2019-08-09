"use strict";

const express = require("express"),
      logger = require("morgan"),
      IndexRouter = require("./routes/index"),
      WebhookRouter = require("./routes/webhook");

class WebServer
{
  constructor()
  {
    this.app = express();
    this.config = require("./config");

    this._setup();
    this._loadRouter();
    this._listen();
  }

  _setup() {
    this.app.set("port", process.env.PORT || this.config.app.port || 3550);
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }))
  }

  _loadRouter()
  {
    this.app.use('/', new IndexRouter(this));
    this.app.use("/webhook", new WebhookRouter(this));
  }

  _listen()
  {
    let port = this.app.get("port");
    this.app.listen(port, (err) =>
    {
        if (err)
            return console.error(err);
        console.log("Webserver powered by Sworder - Launched on port :::" + port + ":::");
    });
  }
};

module.exports = new WebServer();