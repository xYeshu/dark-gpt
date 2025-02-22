import express from "express"
import ImageKit from "imagekit"
import cors from "cors"
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { clerkMiddleware, requireAuth } from '@clerk/express'

const port = process.env.PORT || 8090;

const app = express()

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173", "https://dark-gpt-3.onrender.com"], 
    credentials: true,
  })
);

app.use(express.json())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", 
//       "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("Connected to MongoDB")

  } catch (err) {
    console.log(err)
  }
}
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

app.get('/auth', function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post('/api/chats', requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;
  try {
    //create new chat
    const newChat = new Chat({
      userId: userId,
      history: {
        role: "user",
        parts: [{ text }]
      }
    }
    );
    const savedChat = await newChat.save();

    //check if user chats exits
    const userChats = await UserChats.find({ userId: userId });
    //if doesmt exit then create a new one add chat in the chats array
    if (!userChats.length) {
      const newUserChats = new UserChats({
        userId: userId,

        chats: [{
          _id: savedChat._id,
          title: text.substring(0, 40)
        }]
      })
      await newUserChats.save()
    } else {
      //if exits then push the chat to the existing array
      await UserChats.updateOne({ userId: userId }, {
        $push: {
          chats: {
            _id: savedChat._id,
            title: text.substring(0, 40),
          }
        }
      })
    }
    res.status(201).send(newChat._id);
  }

  catch (err) {
    console.log(err)
    res.status(500).send("Error creating chat")
  }
});


app.get("/api/userchats", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const userChats = await UserChats.find({ userId});
    res.status(200).send(userChats[0].chats)

  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching dashboard userChats")
  }

})

app.get("/api/chats/:id", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: userId });
    res.status(200).send(chat)

  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching chat coversation")
  }

})

app.put("/api/chats/:id", requireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  const {question, answer, img} = req.body;
  const newItems =[
    ...(question 
      ? [{role:"user", parts:[{text:question}], ...(img && {img})}]
    : []),
    {role:"model", parts:[{text:answer}]},
  ]
  try {
    const updatedChat = await Chat.updateOne({_id: req.params.id, userId},{
      $push:{
        history:{
          $each: newItems,

        }
      }
    })
   res.status(200).send(updatedChat);

  } catch (err) {
    console.log(err);
    res.status(500).send("Error Adding chat coversation")
  }

 })




app.listen(port, function () {
  connect()
  console.log(`Live at Port ${port}`);
});
