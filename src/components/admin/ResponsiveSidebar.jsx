import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import { useRouter } from "next/router";
import Link from "next/link";

const drawerWidth = 240;

function ResponsiveSidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // Clear items from local storage
    localStorage.removeItem('apploreUser'); // Modify this according to your storage key

    // Redirect to a different page after logout
    router.push('/'); // Replace with the desired redirect path
  };

  const drawer = (
    <div className="bg-gray-700 text-white h-[100vh]">
      <Toolbar />
      <Box className="flex justify-center mb-4 -mt-12">
        <p className="text-white px-4 text-[40px]">Anime Blog</p>
      </Box>
      <hr className="text-white mx-2" />
      <List>
        <Link href="/admin/blogs" >
            <ListItem disablePadding className={router.pathname === "/admin/blogs" ? 'bg-black' : ''}>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Blogs" />
            </ListItemButton>
          </ListItem>
        </Link>
        
        <Link href="/admin/userBlogs" >
        <ListItem disablePadding className={router.pathname === "/admin/userBlogs" ? 'bg-black' : ''}>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingBagIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="User with Blogs" />
          </ListItemButton>
        </ListItem>
        </Link>

        <Link href="/admin/Users" >
        <ListItem disablePadding className={router.pathname === "/admin/Users" ? 'bg-black' : ''}>
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        </Link>

         <ListItem disablePadding className={router.pathname === "/admin/Users" ? 'bg-black' : ''}>
          <ListItemButton onClick={handleLogout} className="text-center">
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>

        <div className="bg-orange-500 m-4 rounded-lg hover:scale-105 cursor-pointer">
          <a href="/writer/blogs"><p className="text-xl text-center p-2 mt-4">Writer Mode</p></a>
        </div>

      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Toolbar>
        <IconButton
          color="black"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { lg: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveSidebar;
