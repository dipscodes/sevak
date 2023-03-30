// interface Props {
//   onMasterPasswordGiven: (password: string) => void;
// }

export default function MasterPasswordWindow({ onMasterPasswordGiven }: any) {
  return (
    <div className="bg-discord-secondary w-screen h-screen text-text-generic-color">
      <div className="bg-discord-bg-1 w-[450px] h-[180px] flex flex-col justify-between p-10 rounded-md fixed top-2/4 left-2/4 mt-[-180px] ml-[-225px] shadow-lg">
        <input
          type="password"
          className="discord-small-input text-center mb-2 text-discord-sidebar shadow-md"
          id="master-password"
        />
        <button
          type="button"
          className="w-auto bg-discord-button-color hover:bg-discord-button-color-hover text-white font-bold pt-1 pb-2 px-5 mx-auto mt-5 rounded-full transition-all duration-100 ease-linear shadow-md hover:shadow-sm"
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
