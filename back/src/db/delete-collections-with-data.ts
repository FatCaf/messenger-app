import { firestore } from './init-db';

const deleteUsers = async () => {
	const users = ['user_1', 'user_2'];

	const batch = firestore.batch();
	users.forEach((userId) => {
		const userRef = firestore.collection('users').doc(userId);
		batch.delete(userRef);
	});

	await batch.commit();
	console.log('Users deleted');
};

const deleteChatAndMessages = async () => {
	const chatId = 'chat_1';
	const chatRef = firestore.collection('chats').doc(chatId);
	const messagesCollection = chatRef.collection('messages');

	const messagesSnapshot = await messagesCollection.get();
	const batch = firestore.batch();
	messagesSnapshot.forEach((doc) => {
		batch.delete(doc.ref);
	});

	await batch.commit();
	console.log('Messages deleted');

	await chatRef.delete();
	console.log('Chat deleted');
};

const deleteFirestoreData = async () => {
	try {
		await deleteUsers();
		await deleteChatAndMessages();
		console.log('Firestore data deletion complete');
	} catch (error) {
		console.error('Error deleting Firestore data:', error);
	}
};

deleteFirestoreData();
