const Client = require("discord.js");
const { MessageEmbed } = require('discord.js')
const { readdirSync } = require('fs');
const axios = require('axios');
const chatbot_name = "Nezuko";
const chatbot_gender = "Female";
const client = new Client({disableEveryone: true,});
const Token = process.env.TOKEN;
client.login(Token);

// client.on("message", async message =>{
//    if (message.author.bot) return;  //Check Message Was Send By A Bot
//    if (message.channel.id === "ChanelID"|message.channel.id === "ChanelID")   //Check Only Messages On This Chanels
//     {
//       if(!message) throw new Error("Error. No message provided")  //Check Message Not Emty
//       const res = await axios.get(`https://api.udit.gq/api/chatbot?message=${message}&gender=${chatbot_gender}&name=${chatbot_name}`)
//       .then((response) => {
//       const msg = response.data.message;
//       message.channel.send(`${msg}`);
//       }, (error) => {
//         console.log(error);
//       });
//     }else{
//       return;
//    }
//  });