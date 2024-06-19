import admin from 'firebase-admin';
import { firestore } from './init-db';

const initializeUsers = async () => {
	const users = [
		{
			id: 'user_1',
			name: 'Alice',
			email: 'alice@example.com',
			image: 'https://example.com/profile_1.jpg',
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: 'user_2',
			name: 'Bob',
			email: 'bob@example.com',
			image: 'https://example.com/profile_2.jpg',
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		},
	];

	const batch = firestore.batch();
	users.forEach((user) => {
		const userRef = firestore.collection('users').doc(user.id);
		batch.set(userRef, user);
	});

	await batch.commit();
	console.log('Users initialized');
};

const initializeChat = async () => {
	const chat = {
		participants: ['user_1', 'user_2'],
		lastMessage: 'Hello, Bob!',
		lastMessageTimestamp: admin.firestore.FieldValue.serverTimestamp(),
		createdAt: admin.firestore.FieldValue.serverTimestamp(),
	};

	const chatRef = firestore.collection('chats').doc('chat_1');
	await chatRef.set(chat);

	console.log('Chat initialized');
};

const initializeMessages = async () => {
	const messages = [
		{
			senderId: 'user_1',
			text: 'Hello, Bob!',
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
			attachments: [],
			edited: false,
			deleted: false,
		},
		{
			senderId: 'user_2',
			text: 'Hi, Alice!',
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
			attachments: ['https://example.com/image_1.jpg'],
			edited: false,
			deleted: false,
		},
	];

	const chatRef = firestore.collection('chats').doc('chat_1');
	const messagesCollection = chatRef.collection('messages');
	const batch = firestore.batch();
	messages.forEach((message, index) => {
		const messageRef = messagesCollection.doc(`message_${index + 1}`);
		batch.set(messageRef, message);
	});

	await batch.commit();
	console.log('Messages initialized');
};

const initializeFirestore = async () => {
	try {
		await initializeUsers();
		await initializeChat();
		await initializeMessages();
		console.log('Firestore initialization complete');
	} catch (error) {
		console.error('Error initializing Firestore:', error);
	}
};

initializeFirestore();
