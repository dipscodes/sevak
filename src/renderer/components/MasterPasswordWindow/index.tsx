// interface Props {
//   onMasterPasswordGiven: (password: string) => void;
// }

export default function MasterPasswordWindow({ onMasterPasswordGiven }: any) {
  return (
    <div className="bg-discord-secondary w-screen h-screen text-text-generic-color">
      <input type="text" id="master-password" />
      <button
        type="button"
        onClick={() => {
          const mPassword = (
            document.getElementById('master-password') as HTMLInputElement
          ).value;
          onMasterPasswordGiven(mPassword);
        }}
      >
        Add master password
      </button>
    </div>
  );
}
