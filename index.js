const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command')


client.on('ready', () => {
  console.log('Bot Hazır ve Online!')

  command(client, ['açık' , 'hazır' , 'hadi'], (message) => {
      message.channel.send('Botunuz Hazır ve Emirlerinize Avade Patron')
  })

  command(client, 'sunucu', (message) => {
      client.guilds.cache.forEach((guild) => {
       // console.log(guild)
        message.channel.send(
          `${guild.name} Sunucusunda Toplamda ${guild.memberCount} üye bulumaktadır.`
        )
      })    
  })

  command(client, ['cc', 'sil', 'temizle'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'durum', (message) => {
    const content = message.content.replace('!durum', '' )
    //"!durum Davet Kodu :....   - > Davet Kodu : ....."

    client.user.setPresence({
      activity:{
        name: content,
        type:0,
      }
    })
  })

  command(client, 'text', (message) => {
    const name = message.content.replace('!text', '')
    //!metinkanal MetinKanalİsmi
    message.guild.channels
    .create(name,{
      type:'text',
    })
    .then((channel) => {
      const categoryId = '735670677322989610' // Kategori İd
      channel.setParent(categoryId)
    })
  })

  command(client, 'ses', (message) => {
    const name = message.content.replace('!ses', '')

    message.guild.channels
    .create(name, {
      type: 'voice',     
    })
    .then((channel) => {
      const categoryId = '735670677322989610' // Kategori İd
      channel.setParent(categoryId)
      channel.setUserLimit(10)
    })
  })


  command(client, 'youtube', (message) => {
    //console.log(message.author)
    const logo = 'https://superwebsitem.com/wp-content/uploads/logo-300x70-1.png'
    const embed = new Discord.MessageEmbed()
    .setTitle('SuperWebSitem Youtube Kanalı')
    .setURL('https://www.youtube.com/channel/UC8bo-3cpU3IyZqkGVCxVNUA')
    .setAuthor(message.author.username)
    //.setImage(logo)
    .setThumbnail(logo)
    .setFooter('İletişim İçin Cassquettes#3040')
    .setColor('#FF0000')
    .addFields(
      {
        name:'WordPress Dersleri',
        value: 'Seo Çalışmaları',
        inline: true,
      },
      {
        name:'Python Dersleri ',
        value: 'Python Proglama',
        inline: true,
      }
    )

    message.channel.send(embed)
  })


})
client.login(config.token)
