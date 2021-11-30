import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const useLogout = () => {
  const isPending = ref(false);
  const error = ref(null);

  const logout = async () => {
    error.value = null;
    isPending.value = true;

    try {
      await projectAuth.signOut();
      error.value = null;
      isPending.value = false;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { isPending, error, logout };
};

export default useLogout;
