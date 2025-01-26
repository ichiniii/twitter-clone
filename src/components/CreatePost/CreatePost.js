import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
import "./CreatePost.css";

function CreatePost() {
  const [postText, setPostText] = useState("");
  const [imageURL, setImageURL] = useState("");

  const submitPost = async (e) => {
    e.preventDefault();

    if (!postText.trim()) {
      alert("投稿内容を入力してください");
      return;
    }

    try {
      await addDoc(collection(db, "posts"), {
        text: postText,
        image: imageURL || null,
        timestamp: serverTimestamp(),
        displayName: "ユーザー名",
        username: "ユーザーID",
        avatar: "https://example.com/avatar.png",
        verified: true,
      });

      setPostText("");
      setImageURL("");
    } catch (error) {
      console.error("投稿の保存中にエラーが発生しました:", error);
    }
  };

  return (
    <div className="create-post">
      <form onSubmit={submitPost}>
        <textarea
          placeholder="今どうしている？"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <input
          type="text"
          placeholder="画像のURLを入力してください"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <button type="submit">投稿する</button>
      </form>
    </div>
  );
}

export default CreatePost;
