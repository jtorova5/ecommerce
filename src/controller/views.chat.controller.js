
const dbChatsManager = require('../dao/mongoManager/dbChatsManager.js')
const Chats = new dbChatsManager()
const { emitMessage } = require('../utils/socket.io')
const { emitDeleteMj } = require('../utils/socket.io')

const sendMessage = async (req, res) => {
    const message = req.body
    const saveMessage = await Chats.sendMessage(message)
    if (!saveMessage) {
        return res.json({
            msg: 'Message not sent',
        });
    } else {
        emitMessage(saveMessage)
        return res.json({
            msg: 'Message sent',
            playlist: saveMessage,
        })
    }
}

const getSendMessage = async (req, res) => {
    const getMessage = await Chats.getMessage()
    if (!getMessage) {
        return res.json({
            msg: 'Could not get messages',
        });
    } else {
        return res.json({
            msg: 'Chats',
            chats: getMessage
        });
    }

}

const deleteMessage = async (req, res) => {
    const id = req.params.chid
    const deleteMessaje = await Chats.deleteMessage(id)
    if (!deleteMessaje) {
        return res.json({
            msg: 'Could not be deleted',
        });
    } else {
        emitDeleteMj(deleteMessaje)
        return res.json({
            msg: 'Message deleted',
            chats: deleteMessaje
        });
    }
}

module.exports = { sendMessage, getSendMessage, deleteMessage }