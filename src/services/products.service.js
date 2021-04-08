import Api from "@/services/api.service"

const getAll = async () => {
  let response = await Api().get("/product");
  let products = [];
  if(response.status < 300) {
    products = response.data;
  }
  return products;
}

const saveUpdate = async data => {
  let response = {}
    if(data.id)
        response = await Api().patch(`/product/${data.id}`, data);
    else
        response = await Api().post("/product", data);
    
        return response;
}

export const productService = {
  getAll,
  saveUpdate
}