export default function Alert({
  message,
  onAccept,
  onCancel,
}: {
  message: string
  onAccept: () => void
  onCancel?: () => void
}) {
  if (!onCancel) console.error(message)

  return (
    <>
      {!onCancel && (
        <div className="h-screen w-screen absolute bg-black bg-opacity-25 top-0">
          <div className="bg-general-blue absolute left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto top-1/4 flex flex-row items-center justify-center py-2 px-3 gap-3 shadow-lg rounded-lg w-auto text-lg">
            <p className="text-white">{message}</p>
            <button
              className="py-2 text-white font-semibold"
              onClick={onAccept}
            >
              x
            </button>
          </div>
        </div>
      )}

      {onCancel && (
        <div className="h-screen w-screen absolute bg-black bg-opacity-25 top-0">
          <div className="bg-general-blue absolute left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto top-1/4 items-center justify-center py-2 px-3 gap-3 shadow-lg rounded-lg w-auto text-lg">
            <p className="text-white text-justify">{message}</p>
            <div className="flex flex-row gap-6 mt-2 items-center justify-center">
              <button className="text-white font-semibold" onClick={onAccept}>
                Accept
              </button>
              <button className="text-white font-semibold" onClick={onCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
