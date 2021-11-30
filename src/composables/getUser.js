import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const getUser = () => {
  // refs
  const user = ref(projectAuth.currentUser);

  // auth changes
  projectAuth.onAuthStateChanged((_user) => {
    user.value = _user;
  });

  return { user };
};

export default getUser;
