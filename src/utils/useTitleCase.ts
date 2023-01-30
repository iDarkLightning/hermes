export const useTitleCase = () => {
  const titlify = (val: string | null | undefined) =>
    val?.replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

  return { titlify };
};
