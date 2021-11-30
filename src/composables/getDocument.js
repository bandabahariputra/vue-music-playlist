import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const getDocument = (collection, id) => {
  const error = ref(null);
  const document = ref(null);

  // register the firestore collection reference
  let documentRef = projectFirestore.collection(collection).doc(id);

  const unsub = documentRef.onSnapshot(
    (doc) => {
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id };
        error.value = null;
      } else {
        document.value = null;
        error.value = 'Document does not exist';
      }
    },
    (err) => {
      console.log(err.message);
      document.value = null;
      error.value = 'Could not fetch the data';
    },
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document };
};

export default getDocument;
