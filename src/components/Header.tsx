// const Header=()=>{
//     return (
//         <header className="text-white py-5">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12">
//                         <h1 className="display-1">Movie DB</h1>
//                         <h3>Find Your Movie Here</h3>
//                     </div>
//                 </div>
//             </div>
//         </header>
//     )
// }

// export default Header;

const Header = () => {
    return (
      <header className="text-white py-5">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            <div className="w-full text-center">
              <h1 className="text-4xl md:text-5xl font-bold">Movie List</h1>
              <h3 className="text-xl mt-2">Find Your Movie Here</h3>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  export default Header;
  