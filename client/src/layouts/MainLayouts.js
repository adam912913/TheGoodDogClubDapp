import { Layout } from 'antd'
const { Content } = Layout

const MainLayouts = ({ children, className }) => {
  return (
    <Layout style={{ height: '100vh' }} className={className}>
      <Content>{children}</Content>
    </Layout>
  )
}

export default MainLayouts
