using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;

using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace AMTAPP
{
  
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : NavigationWindow
    {
        int Numberic = 0;
        List<string> selectedFolders;

        public MainWindow()
        {
            InitializeComponent();
            NewButton.Visibility = Visibility.Hidden;
            selectedFolders = new List<string>();
        }

        private void MenuItem_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }



        private void NewButton_Click(object sender, RoutedEventArgs e)
        {
            if (selectedFolder.Text != "")
            {
                var item = new Item();
                item.Id = ++Numberic;
                item.folderPath = selectedFolder.Text;
                selectedFolders.Add(selectedFolder.Text);
                selectedFolder.Text = "";
                BrowseItemsControl.Items.Add(item);               
                if(errorSummary.Visibility==Visibility.Visible)
                {
                    errorSummary.Visibility = Visibility.Hidden;
                    selectedFolder.BorderBrush = System.Windows.Media.Brushes.LightGray;
                }
            }
            else
            {
                errorSummary.Visibility = Visibility.Visible;
                selectedFolder.BorderBrush = System.Windows.Media.Brushes.Red;
                errorSummary.Content = "Please browse a folder location to be added";
            }
        }

        private void Delete_OnClick(object sender, RoutedEventArgs e)
        {
            Button SelectedButton = (Button)sender;
            var item = SelectedButton.DataContext;
            BrowseItemsControl.Items.Remove(item);
        }
        public class Item
        {
            public int Id { get; set; }
            public string folderPath { get; set; }
        }


        private void Solution_Checked(object sender, RoutedEventArgs e)
        {
            NewButton.Visibility = Visibility.Hidden;
            errorRadio.Visibility = Visibility.Hidden;
            BrowseItemsControl.Items.Clear();

        }



        private void MultipleProjects_Checked(object sender, RoutedEventArgs e)
        {
            NewButton.Visibility = Visibility.Visible;
            errorRadio.Visibility = Visibility.Hidden;
        }

        private void Browse_Click(object sender, RoutedEventArgs e)
        {
            if ((bool)(MultipleProjects.IsChecked) | (bool)(Solution.IsChecked))
            {
                System.Windows.Forms.FolderBrowserDialog folderDialog = new System.Windows.Forms.FolderBrowserDialog();

                System.Windows.Forms.DialogResult result = folderDialog.ShowDialog();
                if (result == System.Windows.Forms.DialogResult.OK)
                {                  
                    selectedFolder.Text = folderDialog.SelectedPath;
                }
                if (errorSummary.Visibility == Visibility.Visible)
                {
                    errorSummary.Visibility = Visibility.Hidden;
                    selectedFolder.BorderBrush = System.Windows.Media.Brushes.LightGray;
                }

            }
            else
            {
                errorRadio.Visibility = Visibility.Visible;
            }

        }

        private void Next_Click(object sender, RoutedEventArgs e)
        {
           
        }
    }
}
