import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <>
      <Routes>
        {/* Public route 
       <Route path="/" element={ } />
        <Route path="/login" element={ } /> 

         Private routes — everything inside requires admin auth 
         <Route element={ }>
          <Route element={ }>
            
          </Route> 
        </Route>*/}
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#1f1a17',
            color: '#fff',
          },
        }}
      />

    </>
  )
}

export default App
