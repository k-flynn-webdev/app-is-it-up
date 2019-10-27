module.exports = {
  apps : [{
  	name : "app-is-it-up",
    script : "app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },    
    autorestart: true,
    watch : true,
    max_memory_restart: '150M',
    ignore_watch : ["log/log", "node_modules"]
  }]
}