// ✅ Provide a fake import.meta.env in Jest (Node doesn't have it)
global.import = {
  meta: {
    env: {
      MODE: "test",
      VITE_API_URL: "http://localhost:5000/api",
    },
  },
};
