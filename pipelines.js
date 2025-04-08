orders.aggregate([
  {
    $set: {
      hasAnyAccessory: {
        $gt: [
          {
            $size: {
              $setIntersection: [["Laptop"], "$items"],
            },
          },
          0,
        ],
      },
    },
  },
]);

orders.aggregate([
  {
    $set: {
      hasAnyAccessory: {
        $in: ["Laptop", "$items"],
      },
    },
  },
]);
