import React from 'react'

function Loader() {
    return (
        <div className="row">
          <div className="col col-md-12 text-center">
            <div className="text-center">
              <div className="spinner-border text-primary">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
    )
}

export default React.memo(Loader)
