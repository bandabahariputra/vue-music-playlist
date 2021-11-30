import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const useDocument = (collection, id) => {
  const isPending = ref(false);
  const error = ref(null);

  const deleteDoc = async () => {
    error.value = null;
    isPending.value = true;

    let docRef = projectFirestore.collection(collection).doc(id);

    try {
      const res = await docRef.delete();

      isPending.value = false;
      error.value = null;

      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'Could not delete the document';
    }
  };

  const updateDoc = async (updates) => {
    error.value = null;
    isPending.value = true;

    let docRef = projectFirestore.collection(collection).doc(id);

    try {
      const res = await docRef.update(updates);

      isPending.value = false;
      error.value = null;

      return res;
    } catch (err) {
      console.log(err.message);
      isPending.value = false;
      error.value = 'Could not update the document';
    }
  };

  return { isPending, error, deleteDoc, updateDoc };
};

export default useDocument;
