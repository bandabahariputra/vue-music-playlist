import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const useSignup = () => {
  const isPending = ref(false);
  const error = ref(null);

  const signup = async (displayName, email, password) => {
    error.value = null;
    isPending.value = true;

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password,
      );

      if (!res) {
        throw new Error('Could not complete signup');
      }

      await res.user.updateProfile({ displayName });

      error.value = null;
      isPending.value = false;

      return res;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { isPending, error, signup };
};

export default useSignup;
