import Api from "@/services/api.service"

const getAll = async () => {
  let response = await Api().get("/coupon");
  let products = [];
  if(response.status < 300) {
    products = response.data;
  }
  return products;
}

const saveUpdate = async data => {
  let response = {}
    if(data.id)
        response = await Api().patch(`/coupon/${data.id}`, data);
    else
        response = await Api().post("/coupon", data);
    
        return response;
}

export const couponService = {
  getAll,
  saveUpdate
}