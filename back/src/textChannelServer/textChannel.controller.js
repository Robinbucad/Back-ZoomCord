import { createChannel, retreiveChannelsById, retrieveChannels } from "./textChannel.model.js"

export const getChannelsCtrl = async(req,res) => {
    const channels = await retrieveChannels()
   
    res.json(channels)
}

export const createChannelCtrl = async(req,res) => {
    const channel = {
        name : req.body.name,
        serverId:req.body.serverId
    }
    const newChannel = await createChannel(channel)
    res.sendStatus(201)
}

export const getTextChannelByServId = async(req,res) => {
    const {serverId} = req.params
    const channelsById = await retreiveChannelsById(serverId)
    res.json(channelsById)
}