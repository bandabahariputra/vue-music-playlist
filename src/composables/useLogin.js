import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const useLogin = () => {
  const isPending = ref(false);
  const error = ref(null);

  const login = async (email, password) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      error.value = null;
      isPending.value = false;

      return res;
    } catch (err) {
      console.log(err.message);
      error.value = 'Incorrect login credentials';
      isPending.value = false;
    }
  };

  return { isPending, error, login };
};

export default useLogin;
