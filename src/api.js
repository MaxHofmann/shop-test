import { db, auth, storage } from './firebase';
let storageRef = storage.ref();
/* Auth */
export function logInUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signOutUser() {
  return auth.signOut();
}

export function registerUser(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function initAuth(onAuth) {
  auth.onAuthStateChanged(onAuth);
}

export function getCollection() {
  return db
    .collection('shop')
    .get()
    .then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return items;
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
}

export function createCart(data) {
  const name = data.img.name.slice(0, data.img.name.length - 4);
  let imagesRef = storageRef.child(`images/${name}.jpg`);
  return imagesRef.put(data.img).then((snapshot) => {
    storageRef
      .child(`images/${name}.jpg`)
      .getDownloadURL()
      .then((url) => {
        return db
          .collection('shop')
          .add({
            name: data.name,
            description: data.description,
            price: data.price,
            aDiscount: data.aDiscount,
            endOfDiscount: data.endOfDiscount,
            imageUrl: url,
          })
          .then((docRef) => docRef.get())
          .then((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      });
  });
}

export function deleteTodo(data) {
  return db
    .collection('shop')
    .doc(data.idCart)
    .delete()
    .then(() => {
      storage.refFromURL(data.urlImage).delete();
    });
}

let todoId = '';
export function setId({ payload }) {
  todoId = payload.id;
  return payload.id;
}

export function updateCart(data) {
  const name = data.img.name.slice(0, data.img.name.length - 4);
  let imagesRef = storageRef.child(`images/${name}.jpg`);
  return imagesRef.put(data.img).then((snapshot) => {
    storageRef
      .child(`images/${name}.jpg`)
      .getDownloadURL()
      .then((url) => {
        return db
          .collection('shop')
          .doc(todoId)
          .update({
            name: data.name,
            description: data.description,
            price: data.price,
            aDiscount: data.aDiscount,
            endOfDiscount: data.endOfDiscount,
            imageUrl: url,
          })
          .then(() => ({
            id: todoId,
            ...data,
          }));
      });
  });
}
