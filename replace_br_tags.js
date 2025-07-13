import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory for the actual project
const targetDir = path.join(__dirname, 'src', 'core', 'data');

// Get all class directories
function getClassDirs() {
    try {
        return fs.readdirSync(targetDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
    } catch (error) {
        console.error(`❌ Error reading target directory: ${targetDir}`);
        console.error(error.message);
        return [];
    }
}

function replaceBrTags() {
    console.log('🔄 REPLACING <br> TAGS WITH LINE BREAKS');
    console.log(`📁 Target directory: ${targetDir}`);
    console.log('Converting HTML <br> tags to actual line breaks (\\n)\n');
    console.log('='.repeat(60));

    const classDirs = getClassDirs();
    if (classDirs.length === 0) {
        console.log('❌ No class directories found!');
        return;
    }

    let updatedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    let totalReplacements = 0;

    classDirs.forEach(className => {
        const classDir = path.join(targetDir, className);

        // Get all spec files (non-raw files)
        let specFiles;
        try {
            specFiles = fs.readdirSync(classDir)
                .filter(file => file.endsWith('.ts') && !file.startsWith('raw_'));
        } catch (error) {
            console.log(`❌ Error reading ${className} directory: ${error.message}`);
            errorCount++;
            return;
        }

        if (specFiles.length === 0) {
            return;
        }

        console.log(`\n${className.toUpperCase()}:`);

        specFiles.forEach(specFile => {
            const specName = specFile.replace('.ts', '');
            const specFilePath = path.join(classDir, specFile);

            try {
                // Read the existing TS file
                const originalContent = fs.readFileSync(specFilePath, 'utf8');
                
                // Check if it contains <br> tags
                const hasBrTags = originalContent.includes('<br>') || 
                                 originalContent.includes('<br/>') || 
                                 originalContent.includes('<br />');
                
                if (!hasBrTags) {
                    console.log(`  ✅ ${specName}: No <br> tags found`);
                    skippedCount++;
                    return;
                }

                // Count replacements for this file
                const brMatches = originalContent.match(/<br\s*\/?>/gi) || [];
                const fileReplacements = brMatches.length;
                
                // Replace various forms of <br> tags with actual line breaks
                let updatedContent = originalContent
                    .replace(/<br\s*\/?>/gi, '\\n')  // Replace <br>, <br/>, <br /> with \\n
                    .replace(/\\n\\n/g, '\\n\\n');     // Keep double line breaks as double

                // Write the updated file
                fs.writeFileSync(specFilePath, updatedContent);
                
                console.log(`  🔄 ${specName}: Replaced ${fileReplacements} <br> tag(s)`);
                updatedCount++;
                totalReplacements += fileReplacements;

            } catch (error) {
                console.log(`  ❌ ${specName}: Error - ${error.message}`);
                errorCount++;
            }
        });
    });

    console.log('\n' + '='.repeat(60));
    console.log('📊 UPDATE SUMMARY:');
    console.log(`🔄 Files updated: ${updatedCount}`);
    console.log(`✅ Files with no <br> tags: ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📝 Total <br> tags replaced: ${totalReplacements}`);
    console.log('='.repeat(60));
    
    if (updatedCount > 0) {
        console.log('\n🚀 SUCCESS: <br> tags replaced with line breaks!');
        console.log('💡 Note: Line breaks are now represented as \\\\n in the JSON strings');
    }
}

// Execute the replacement
replaceBrTags();
