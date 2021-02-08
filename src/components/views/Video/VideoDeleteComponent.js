import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function VideoDeleteComponent(props) {
  const [Chapters, setChapters] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = () => {
    axios.get(`/api/chapter/`).then((res) => {
      console.log(res.data);
      setChapters(res.data);
    });
    console.log(Chapters);
  };
  const deleteVideo = (e, id, ch_id) => {
    const variables = { ch_id, id };
    console.log(id);
    console.log(ch_id);
    axios.delete("/api/video/delete-video", { data: variables }).then((res) => {
      if (res.status === 201) {
        alert(res.data);
        getVideos();
      } else {
        alert("Failed to upload Quiz");
      }
    });
  };

  return (
    <div className="container m-3">
      <h2>Uploads</h2>
      <hr className="border-dark" />
      {Chapters.map((chapter) => (
        <div className="row border rounded shadow p-2 m-5">
          <div className="col-sm-6 h4 text-dark" id={chapter._id}>
            {chapter.chapterName}
          </div>
          <br />
          <div className="list-group inline">
            {chapter.topics.map((topic) => (
              <div
                className="list-group-item inline"
                value={topic.topicid}
                id={topic.topicid}
              >
                {topic.topicName}&nbsp;&nbsp;&nbsp;
                <button
                  className="btn btn-danger"
                  style={{
                    alignment: "right",
                    //   right: "10px",
                    //   bottom: "10px",
                  }}
                  onClick={(e) => deleteVideo(e, topic.topicid, chapter._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      );
    </div>
  );
}

export default VideoDeleteComponent;
