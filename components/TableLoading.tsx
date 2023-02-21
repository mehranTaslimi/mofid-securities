export default function TableLoading() {
  return (
    <>
      {new Array(10).fill(null).map((_, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            <div className="animate-pulse">
              <div className="flex h-full animate-pulse flex-row items-center justify-start space-x-5">
                <div className="h-12 w-12 rounded-full bg-base-content" />
                <div className="flex flex-col space-y-3">
                  <div className="h-3 w-32 rounded-md bg-base-content" />
                  <div className="h-2 w-20 rounded-md bg-base-content" />
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="animate-pulse">
              <div className="h-2 w-20 rounded-md bg-base-content" />
            </div>
          </td>
          <td>
            <div className="animate-pulse">
              <div className="h-2 w-20 rounded-md bg-base-content" />
            </div>
          </td>
          <td>
            <div className="animate-pulse">
              <div className="h-2 w-20 rounded-md bg-base-content" />
            </div>
          </td>
          <td>
            <div className="animate-pulse">
              <div className="h-2 w-20 rounded-md bg-base-content" />
            </div>
          </td>
          <td>
            <div className="animate-pulse">
              <div className="h-2 w-20 rounded-md bg-base-content" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
