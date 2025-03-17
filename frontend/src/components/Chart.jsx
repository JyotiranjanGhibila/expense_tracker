import { Box, Flex, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


const Chart = (props) => {
const { categoryData , monthlyData} = props;

    return(
        <Flex gap={"10px"} m={"70px 0px"} padding={"5px"} borderRadius={"10px"} flexDir={{base:"column",lg:"row"}} alignContent={"center"}>
          <Box borderRadius={"10px"} boxShadow={"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;"}
           width={{sm:"100%", md:"40%"}} padding={"5px"}>
            <Heading size="md" textAlign="center">
              Spending by Category
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Box boxShadow={"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;"} width={{sm:"100%", md:"60%"}} borderRadius={"10px"}
          >
            <Heading size="md" textAlign="center">
              Monthly Spending Trend
            </Heading>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          </Flex>
    )
}

export default Chart;