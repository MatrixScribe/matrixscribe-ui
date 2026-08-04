import ProfileSection from "./ProfileSection";

export function ProfileModal({ open, onClose, user }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-600 hover:text-black"
        >
          ✕
        </button>

        <ProfileSection user={user} />
      </div>
    </div>
  );
}
