import axios from "axios";

const apiurl = process.env.NEXT_PUBLIC_API_URL;

console.log(process.env);
export const getAnnotation = (authId: string, token: string) => {
  return axios.get(`${apiurl}/api/v2/users/${authId}/graph/annotations`, {
    headers: { Authorization: "Bearer " + token },
  });
};

export const getawa = (token: string) => {
  return axios.post(
    `${apiurl}/api/v2/reports/awa`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getusers = (token: string) => {
  return axios.get(`${apiurl}/api/v2/users/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
