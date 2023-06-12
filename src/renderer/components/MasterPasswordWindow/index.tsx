export default function MasterPasswordWindow({ onMasterPasswordGiven }: any) {
  return (
    <div className="bg-discord-secondary w-screen h-screen text-text-generic-color">
      <div className="master-password-modal">
        <input
          type="password"
          className="discord-small-input text-center mb-2 text-discord-sidebar shadow-md"
          id="master-password"
        />
        <button
          type="button"
          className="master-password-add-button"
          onClick={() => {
            const mPassword = (
              document.getElementById('master-password') as HTMLInputElement
            ).value;
            onMasterPasswordGiven(mPassword);
          }}
        >
          Add Master Password
        </button>
      </div>
    </div>
  );
}
