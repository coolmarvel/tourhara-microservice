const axios = require("axios");

const main = async () => {
  try {
    for (let i = 1; i < Infinity; i++) {
      const result = await axios.post("http://localhost:3000/api/order/staging/synchronize");
      console.log(`${i} request's statuscode: ${result.status}`);

      if (result.status == 204) break;
    }
  } catch (error) {
    console.error(error.message);
  }
};
main();
