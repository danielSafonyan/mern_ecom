const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

const arrow = fn => (name) => {
 fn(name)
}

const newArrow = arrow(console.log)
newArrow("Daniel")