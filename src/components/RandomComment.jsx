import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const comments = [
    "p",
    "k",
    "t",
    "dump eet",
    "l",
    "PAMP IT AGAIN",
    "m",
    "888 TO THE MOON LETSGOOOOOO",
    "test",
    "lol",
    "kek",
    "f",
    "wen pump ser???",
    "testing123",
    "h",
    "NGMI PAPER HANDS",
    "j",
    "lmaooo who just market sold",
    "ayy lmao 888 looking juicy",
    "test test",
    "g",
    "PAMP PAMP PAMP",
    "rekt",
    ">implying 888 isnt going 100x",
    "HOOOODL FRENS",
    "trust me bro",
    "MANIPULATION!!!!",
    "!!FREE COIN!! j29x_ CLAIM NOW j29x_",
    "wen lambo",
    "wagmi",
    "imagine selling here ngmi",
    "🐋🐋🐋",
    "source: trust me bro",
    "BEARS GETTING REKT",
    "LETS GOOOOO 888 FAM",
    "pamp",
    "diamond hands only 💎",
    "lel",
    ">he sold?",
    "888 GOING PARABOLIC",
    "test123",
    "HODL OR NGMI",
    "lololol paper hands crying",
    "!!GIVEAWAY!! k39x_ NOW LIVE k39x_",
    "ded",
    "PUMP IT LOUDER",
    "testing",
    "wen moon ser"
];

const RandomComment = () => {
    const [messages, setMessages] = useState([]);
    const maxMessages = 15;

    const generateRandomComment = () => {
        try {
            const randomComment = comments[Math.floor(Math.random() * comments.length)];
            const randomWallet = ethers.Wallet.createRandom();
            const shortAddress = `${randomWallet.address.substring(0, 6)}...${randomWallet.address.substring(38)}`;
            
            setMessages(prev => {
                const newMessages = [...prev, { 
                    address: shortAddress, 
                    text: randomComment, 
                    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
                }];
                if (newMessages.length > maxMessages) {
                    return newMessages.slice(-maxMessages);
                }
                return newMessages;
            });
        } catch (error) {
            console.error('Error generating random comment:', error);
        }
    };

    useEffect(() => {
        // Initial static messages
        const initialMessages = [
            {
                address: "0x1234...5678",
                text: "Testing",
                id: "static_1"
            },
            {
                address: "0x1234...5678",
                text: "Testing again",
                id: "static_2"
            },
            {
                address: "0x9ABC...DEF0",
                text: "lmao i see that",
                id: "static_3"
            }
        ];

        setMessages(initialMessages);

        // Start generating random messages after a delay
        const timeout = setTimeout(() => {
            const interval = setInterval(generateRandomComment, 15000);
            return () => clearInterval(interval);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="troll-box-container flex-grow">
                {messages.map((message) => (
                    <div key={message.id} className="message-item">
                        <div className="flex items-center gap-2">
                            <span className="message-address">{message.address}:</span>
                            <span className="message-text">{message.text}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    placeholder="Connect wallet to chat..."
                    disabled={true}
                    className="chat-input"
                />
            </div>
        </div>
    );
};

export default RandomComment; 