// import { useUserStore } from "src/stores/user";
// import { useProfileStore } from "src/stores/profile";
export default async function auth({ next }) {
  // next();
  // return;
  // const userStore = useUserStore();
  // const profileStore = useProfileStore();
  if (true) {
    // if (!profileStore.infoExist) {
    //   await profileStore.loadInfo().catch(() => false);
    //   if (!profileStore.infoExist) return next({ name: "login" });
    // }
    return next();
  }
  next({ name: "login" });
}
