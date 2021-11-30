import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const useCollection = (collection) => {
  const error = ref(null);

  const addDoc = async (doc) => {
    error.value = null;

    try {
      const res = await projectFirestore.collection(collection).add(doc);
      error.value = null;

      return res;
    } catch (err) {
      console.log(err.message);
      error.value = 'Cannot add the data';
    }
  };

  return { error, addDoc };
};

export default useCollection;
