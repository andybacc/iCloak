import { Heading } from '@chakra-ui/react';
import mqtt from 'mqtt';
import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { TbPlugOff } from "react-icons/tb";
import useStore from "../store";

const Mqtt = () => {
    const [connectStatus, setConnectStatus] = useState(false);
    const [client, setClient] = useState(null);
    const mqttClient = 'iCloak_' + Math.floor(Date.now() / 1000)

    const mqttConnect = () => {
        console.log('Starting MQTT')
        var host = location.host.includes('localhost')
        ?'wss://molocinque.ns0.it/mqtt/'
        :'wss://molocinque.ns0.it/mqtt/'
      setClient(mqtt.connect(host, { keepAlive: 3, clientId: mqttClient, clean: false, username: 'mqttUser', password: 'st9zxm'}));
    };

    useEffect(() => {
      if (!client) return;
      client.on('connect', () => {
        console.log('Connected')
        setConnectStatus(true);
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
    }, [client])
    
    useEffect(() => {
      if (!connectStatus) {
        mqttConnect();
      }
    }, [connectStatus])

    return (
        <>
        <Heading>{connectStatus?<GoDotFill color='lightGreen'/>:<TbPlugOff />}</Heading>
        </>
    )
}
export default Mqtt