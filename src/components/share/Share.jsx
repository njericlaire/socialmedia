import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Mutation for creating a new post
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      try {
        return await makeRequest.post("/posts", newPost);
      } catch (error) {
        console.error("Error creating post:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  // Function to upload the image file
  const upload = async () => {
    if (!file) return "";

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data.url; // Ensure this matches your API response
    } catch (err) {
      console.error("Error uploading file:", err);
      throw err;
    }
  };

  // Handle the click event for sharing a post
  const handleClick = async (e) => {
    e.preventDefault();

    let imgUrl = "";
    if (file) {
      try {
        imgUrl = await upload();
      } catch (err) {
        console.error("Failed to upload image. Post will be created without image.");
      }
    }

    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={`/upload/${currentUser.profilePic}`} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind, ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file-preview" alt="Preview" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="Add" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="Add Place" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="Tag Friends" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
