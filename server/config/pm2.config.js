module.exports = {
  apps : [{
    script : "app.js",
    autorestart: true,
    watch : true,
    max_memory_restart: '150M',
    ignore_watch : ["log/log", "node_modules"]
  }]
}