export default function loadDatabase(path, initialData) {
    const data = {
        current: initialData,
    };

    let isLoading = true;
    fetch(path)
      .then(res => res.json())
      .then(res => {
          data.current = res;
          isLoading = false;
      });

    const ensureLoading = handler => {
        if (!isLoading) handler();
        else {
            setTimeout(() => ensureLoading(handler), 500);
        }
    }
    return {data, ensureLoading}
}
