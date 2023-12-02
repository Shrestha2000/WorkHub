import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProjectsByRole } from "../../apicalls/projects";
import { message } from "antd";
import { SetLoading } from "../../redux/loadersSlice";
import { getDateFormat } from "../../utils/helpers";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";

function Home() {
  const [projects, setProjects] = useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetProjectsByRole();
      dispatch(SetLoading(false));
      if (response.success) {
        setProjects(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="text-primary text-xl">
        Hey, {user?.firstName} {user?.lastName} , Welcome to WorkHub
      </h1>

      <div className="grid grid-cols-4 gap-5 mt-5">
        {projects.map((project) => (
          <div
            className="flex flex-col gap-1 border border-solid border-gray-400 rounded-md p-2 cursor-pointer"
            onClick={() => navigate(`/project/${project._id}`)}
          >
            <h1 className="text-primary text-lg uppercase font-semibold">
              {project.name}
            </h1>

            <Divider />

            <div className="flex justify-between">
              <span className="text-sm">Created At</span>
              <span className="text-sm">
                {getDateFormat(project.createdAt)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Owner</span>
              <span className="text-sm">{project.owner.firstName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Status</span>
              <span className="text-sm uppercase">{project.status}</span>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="flex">
          <h1 className="text-primary text-xl">You have no projects yet!</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
