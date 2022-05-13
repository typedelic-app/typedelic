export default function searchFiles(
  data: any,
  searchValue: string,
  dispatch: any
) {
  if (data.length !== 0 || searchValue !== '') {
    const list = data.filter((e: any) => {
      return (
        e.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        e.excerpt.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    dispatch({
      type: 'SET_SEARCHED',
      searched: list,
    });
  } else {
    dispatch({
      type: 'SET_SEARCHED',
      searched: data,
    });
  }
}
