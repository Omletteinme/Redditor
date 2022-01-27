module.exports = {
    status( prefix, client ){
        return [
      { activity: { name: `${prefix}invite`, type: "PLAYING" }, status: 'online' },
      { activity: { name: `${prefix}dankmemes`, type: "PLAYING" }, status: 'online' },
      { activity: { name: `${client.guilds.cache.size} servers`, type: "WATCHING" }, status: 'online' }
    ]
  }
}