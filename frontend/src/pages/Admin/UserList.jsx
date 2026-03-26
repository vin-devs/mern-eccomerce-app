import { useEffect, useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaUserShield,
} from "react-icons/fa";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Message from "../../components/Message";
import AdminMenu from "./AdminMenu.jsx";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-10">
      <AdminMenu />

      <div className="container mx-auto px-4 pt-[6rem]">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-600/20 rounded-2xl text-indigo-400">
            <FaUserShield size={24} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            User Management
          </h1>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <div className="overflow-x-auto bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur-md shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-800/30">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                    ID
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">
                    Email Address
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 text-center">
                    Admin Status
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-800/20 transition-colors group"
                  >
                    <td className="px-6 py-4 text-xs font-mono text-slate-500">
                      {user._id.substring(0, 8)}...
                    </td>

                    {/* Name Column */}
                    <td className="px-6 py-4">
                      {editableUserId === user._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="bg-slate-800 border border-indigo-500/50 p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-slate-200">
                            {user.username}
                          </span>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 hover:text-indigo-300"
                          >
                            <FaEdit size={14} />
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Email Column */}
                    <td className="px-6 py-4">
                      {editableUserId === user._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="bg-slate-800 border border-indigo-500/50 p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="bg-indigo-600 p-2 rounded-lg hover:bg-indigo-500 transition-colors"
                          >
                            <FaCheck size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 text-sm">
                            {user.email}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Admin Status */}
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {user.isAdmin ? (
                          <div className="bg-emerald-500/10 text-emerald-500 p-2 rounded-full border border-emerald-500/20">
                            <FaCheck size={12} />
                          </div>
                        ) : (
                          <div className="bg-rose-500/10 text-rose-500 p-2 rounded-full border border-rose-500/20">
                            <FaTimes size={12} />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Delete Action */}
                    <td className="px-6 py-4 text-right">
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="text-slate-500 hover:text-rose-500 transition-colors p-2 hover:bg-rose-500/10 rounded-xl"
                        >
                          <FaTrash size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
