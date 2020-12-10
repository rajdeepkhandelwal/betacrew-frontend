import { API } from "../backend";

// Upload file to database with backend API
export const uploadUserFile = (userId, token, data) => {
  return fetch(`${API}/upload/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//Get user file data from backend
export const getUserData = (userId, token) => {
  return fetch(`${API}/getfile/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json(res))
    .catch((err) => console.log(err));
};

//get file with link from database
export const fileHelper = (file) => {
  const url = file ? `${API}/file/${file.owner.id}/${file._id}` : `#`;
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {file.name}
    </a>
  );
};

// create array for chart data
export const pieChartData = (filedata) => {
  const data = [];
  let obj = {
    pdf: 0,
    jpeg: 0,
    png: 0,
    xlsx: 0,
    docx: 0,
    mixType: 0,
  };
  filedata &&
    filedata?.forEach((data, index) => {
      switch (data.userFile.contentType) {
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          obj.docx++;
          break;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          obj.xlsx++;
          break;
        case "application/pdf":
          obj.pdf++;
          break;
        case "image/jpeg":
          obj.jpeg++;
          break;
        case "image/png":
          obj.png++;
          break;
        default:
          obj.mixType++;
      }
    });
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  keys.forEach((key, index) => {
    if (values[index] > 0) {
      data.push({
        name: key,
        value: values[index],
      });
    }
  });
  return data;
};
