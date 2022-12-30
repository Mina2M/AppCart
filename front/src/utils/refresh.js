export async function refresh() {
  await new Promise((resolve) => {
    window.location.reload();
    resolve();
  });
}
